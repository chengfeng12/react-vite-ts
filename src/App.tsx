import { useState, startTransition } from 'react'

function App() {
  const [input, setInput] = useState('')
  const [list, setList] = useState<string[]>([])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
    startTransition(() => {
      // 低优先级的更新（如渲染大量列表）
      setList(new Array(10000).fill(e.target.value))
    })
  }

  return (
    <div>
      <input value={input} onChange={handleChange} />
      {list.map((item, index) => (
        <div key={index}>{item}</div>
      ))}
    </div>
  )
}

export default App
