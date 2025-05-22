import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_main/ko/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/ko/"!</div>
}
