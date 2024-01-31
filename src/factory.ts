import { Create as CreateEvent } from "../generated/factory/factory"
import { Create } from "../generated/schema"

export function handleCreate(event: CreateEvent): void {
  let entity = new Create(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.owner = event.params.owner
  entity.token = event.params.token
  entity.totalSupply = event.params.totalSupply

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
