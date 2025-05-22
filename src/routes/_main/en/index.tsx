import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_main/en/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/en/"!</div>
}
