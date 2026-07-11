import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/order-success')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/order-success"!</div>
}
