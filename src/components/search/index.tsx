import { SearchIcon } from 'lucide-react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'

export default function Search() {
  return (
    <div className="flex gap-4">
      <Input placeholder="Search" />
      <Button className="bg-red-500 hover:bg-red-600">
        <SearchIcon />
      </Button>
    </div>
  )
}
