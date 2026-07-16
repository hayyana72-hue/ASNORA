import { clx } from "@modules/common/components/ui"

const Divider = ({ className }: { className?: string }) => (
  <div
    className={clx("h-px w-full border-b border-gold-400/10 mt-1", className)}
  />
)

export default Divider
