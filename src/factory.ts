import { Create as CreateEvent } from "../generated/factory/factory"
import { Create, Token } from "../generated/schema"
import {
  fetchTokenDecimals,
  fetchTokenName,
  fetchTokenSymbol,
  convertTokenToDecimal
} from './helpers'

export function handleCreate(event: CreateEvent): void {
  let entity = new Create(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.owner = event.params.owner
  entity.token = event.params.token

  let token = Token.load(event.params.token)
  if (token === null) {
    token = new Token(event.params.token)
    token.symbol = fetchTokenSymbol(event.params.token)
    token.name = fetchTokenName(event.params.token)
    token.decimals = fetchTokenDecimals(event.params.token)
    token.save()
  }
  // entity.tokenName = token.name
  // entity.tokenSymbol = token.symbol
  // entity.tokenDecimals = token.decimals

  // entity.totalSupply = event.params.totalSupply
  entity.totalSupply = convertTokenToDecimal(event.params.totalSupply, token.decimals)

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
