import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/order-failed')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/order-failed"!</div>
}
