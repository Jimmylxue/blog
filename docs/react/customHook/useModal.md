# useModal

::: tip 自定义 `hook`/组件封装
封装一个自定义 `hook` 或者组件不难，但是要封装的容易复用和好用，还是需要比较讲究一点的。
:::

我们在日常业务开发经常会需要用到`Modal`这类的弹窗，几乎所有的组件库都有`Modal`这种弹窗，且其`api`也基本比较固定。这里我们以一个使用最多最广泛的`antd`组件库来作为例子。

下面看一个最简单的一个业务代码例子：

这是我们封装的一个 `Modal1` 的弹窗。效果大致如下：

![Kapture 2024-01-30 at 15.54.42的副本](https://image.jimmyxuexue.top/img/202401301601401.gif)

```tsx
import { Modal } from 'antd'

type TProps = {
	initValue: string
	open: boolean
	onClose: () => void
	onOk: () => void
}

export function Modal1({ initValue, open, onClose, onOk }: TProps) {
	return (
		<Modal title="modal1" open={open} onCancel={onClose} onOk={onOk}>
			<p>业务一</p>
			modal1:{initValue}
		</Modal>
	)
}
```

我们使用这个 `Modal`，应该这么用：

```tsx
import { Button } from 'antd';
import { Modal1 } from './components/Modal1';
import { useRef, useState } from 'react';

export function Demo() {
  const [modal1Show, setModal1Show] = useState<boolean>(false);
  const modal1InitValue = useRef<string>('1');

  return (
    <>
      <Button
        onClick={() => {
          modal1InitValue.current = '点击业务按钮1设置的值';
          setModal1Show(true);
        }}>
        业务一展示
      </Button>

      <Modal1
        initValue={modal1InitValue.current}
        open={modal1Show}
        onClose={() => {
          setModal1Show(false);
        }}
        onOk={() => {
          setModal1Show(false);
        }}
      />
  );
}
```

当我们页面只有一个弹窗时，整体代码看起来还行，也挺优雅和正常的，假设页面有三个弹窗，那么我们页面代码将变为这样：

```tsx
import { Button } from 'antd'
import { Modal1 } from './components/Modal1'
import { Modal2 } from './components/Modal2'
import { useRef, useState } from 'react'
import { Modal3 } from './components/Modal3'

export function Demo() {
	const [modal1Show, setModal1Show] = useState<boolean>(false)
	const modal1InitValue = useRef<string>('1')

	const [modal2Show, setModal2Show] = useState<boolean>(false)
	const modal2InitValue = useRef<number>(3)

	const [modal3Show, setModal3Show] = useState<boolean>(false)
	const modal3InitValue = useRef<{ name: string }>({ name: '' })

	return (
		<>
			<Button
				onClick={() => {
					modal1InitValue.current = '点击业务按钮1设置的值'
					setModal1Show(true)
				}}
			>
				业务一展示
			</Button>
			<Button
				onClick={() => {
					modal2InitValue.current = 999
					setModal2Show(true)
				}}
			>
				业务二展示
			</Button>
			<Button
				onClick={() => {
					modal3InitValue.current = { name: 'jimmy' }
					setModal3Show(true)
				}}
			>
				业务三展示
			</Button>

			<Modal1
				initValue={modal1InitValue.current}
				open={modal1Show}
				onClose={() => {
					setModal1Show(false)
				}}
				onOk={() => {
					setModal1Show(false)
				}}
			/>

			<Modal2
				initValue={modal2InitValue.current}
				open={modal2Show}
				onClose={() => {
					setModal2Show(false)
				}}
				onOk={() => {
					setModal2Show(false)
				}}
			/>

			<Modal3
				initValue={modal3InitValue.current}
				open={modal3Show}
				onClose={() => {
					setModal3Show(false)
				}}
				onOk={() => {
					setModal3Show(false)
				}}
			/>
		</>
	)
}
```

代码本身并没有任何问题，但是我们写了一系列的重复代码，这才三个弹窗，如果更多的话，一个文件中我们就会写上非常多的这类功能相同的代码，所以我们可以分析出相同的部分，然后抽成一个`hook`，来优化我们的代码！

**相同部分**

- `Modal` 的展示状态 `open`
- 给 `Modal` 传递的默认值
- `Modal` 展示方法
- `Modal` 的取消按钮事件
- `Modal` 的确定按钮事件

所以我们基于这么四个关键点，我们可以封装一个叫`useModal`的自定义 `hook`：

```tsx
import { useState } from 'react'

export type IUseModalResult<T = any> = {
	open: boolean
	initValue?: T
	openModal: (initValue?: T) => void
	closeModal: () => void
	onOk?: (values?: T) => void
}

type CallBack<T> =
	| {
			onOk?: (values?: T) => void
	  }
	| undefined

export function useModal<T extends any>(
	callback: CallBack<T>
): IUseModalResult<T> {
	const [open, setOpen] = useState<boolean>(false)
	const [initValue, setInitValue] = useState<T>()

	const openModal = (initValue?: T) => {
		setInitValue(initValue)
		setOpen(true)
	}

	const closeModal = () => {
		setOpen(false)
	}

	const onOk = callback?.onOk

	return {
		open,
		initValue,
		openModal,
		closeModal,
		onOk,
	}
}
```

我们封装了这么一个 `hook` 之后，就可以返回这四个状态了，之后我们只需要将这五个字段传递给我们的`Modal`组件，自己的 `Modal` 组件需要适配一下这几个字段：

```tsx
import { IUseModalResult } from '@/hooks/useModal'
import { Modal } from 'antd'

export function Modal1({ ...args }: IUseModalResult) {
	const { open, initValue, closeModal, onOk } = args
	return (
		<Modal title="modal1" open={open} onCancel={closeModal} onOk={onOk}>
			<p>业务一</p>
			modal1:{initValue}
		</Modal>
	)
}
```

适配好之后，我们的就可以这么来使用它了：

```tsx
export function Demo2() {
	const { open, initValue, openModal, closeModal, onOk } = useModal<string>({})

	return (
		<>
			<Button
				onClick={() => {
					openModal('点击业务按钮1设置的值')
				}}
			>
				业务一展示
			</Button>

			<Modal1
				open={open}
				initValue={initValue}
				openModal={openModal}
				closeModal={closeModal}
				onOk={onOk}
			/>
		</>
	)
}
```

这么写太长了，我们可以做这么一个简写操作：

```tsx
export function Demo2() {
	const modal1 = useModal<string>({})

	return (
		<>
			<Button
				onClick={() => {
					modal1.openModal('点击业务按钮1设置的值')
				}}
			>
				业务一展示
			</Button>

			<Modal1 {...modal1} />
		</>
	)
}
```

这样之后，就算我们页面引用了三个`Modal`，只要我们内部的 `Modal` 走这么一套结构，那么我们的页面就会变得异常的清晰，如下：

```tsx
export function Demo2() {
	const modal1 = useModal<string>({})
	const modal2 = useModal<number>({})
	const modal3 = useModal<{ name: string }>({})

	return (
		<>
			<Button
				onClick={() => {
					modal1.openModal('点击业务按钮1设置的值')
				}}
			>
				业务一展示
			</Button>
			<Button
				onClick={() => {
					modal2.openModal(999)
				}}
			>
				业务二展示
			</Button>
			<Button
				onClick={() => {
					modal3.openModal({ name: 'jimmy' })
				}}
			>
				业务三展示
			</Button>

			<Modal1 {...modal1} />
			<Modal2 {...modal2} />
			<Modal3 {...modal3} />
		</>
	)
}
```
