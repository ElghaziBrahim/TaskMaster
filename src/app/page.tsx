import AddTodoHome from "@/components/AddTodoHome"
import HeroHome from "@/components/HeroHome"
import getCurrentUser from "@/libs/getCurrentUser"

export default async function Home() {

  return (
    <div>
      <AddTodoHome />
      <HeroHome />
    </div>
  )
}
