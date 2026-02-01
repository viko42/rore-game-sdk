# ore-game-sdk

SDK for interacting with the rOre Game smart contract on Ronin.

## Installation

```bash
# From GitHub
npm install github:viko42/ore-game-sdk
```

## Requirements

- `viem` ^2.0.0 (peer dependency)

## Quick Start

```typescript
import { init, getRound, prepareMineTx, getCurrentRoundId } from 'ore-game-sdk';

// Initialize the SDK once at app startup
init({
  contractAddress: '0x...', // Ore Game contract address
  wethAddress: '0x...',     // WETH token address on Ronin
  rpcUrl: 'https://api.roninchain.com/rpc'
});

// Now you can use all SDK functions without passing rpcUrl
const roundId = await getCurrentRoundId();
const round = await getRound(roundId);

console.log('Current round:', round);
```

## API Reference

### Configuration

#### `init(config: OreGameConfig): void`

Initialize the SDK with contract addresses and RPC URL. Must be called before using any other functions.

```typescript
init({
  contractAddress: '0x...', // Ore Game contract address
  wethAddress: '0x...',     // WETH token address
  rpcUrl: 'https://...'     // RPC endpoint URL
});
```

### Read Functions

All read functions use the configured `rpcUrl` by default. You can optionally pass a custom `rpcUrl` as the last parameter.

#### Game State
- `getCurrentRoundId(rpcUrl?)` - Get the current round ID
- `getRound(roundId, rpcUrl?)` - Get round details
- `getRoundWinners(roundId, rpcUrl?)` - Get winners for a round
- `getRoundBoardStats(roundId, user, rpcUrl?)` - Get board stats for a round
- `getMotherlodePool(rpcUrl?)` - Get motherlode pool amount
- `getProtocolStats(rpcUrl?)` - Get protocol statistics

#### User Data
- `getBalanceOf(user, rpcUrl?)` - Get ORE balance
- `getStakedOre(user, rpcUrl?)` - Get staked ORE amount
- `getUnclaimedOre(user, rpcUrl?)` - Get unclaimed ORE
- `getDepositedToken(user, rpcUrl?)` - Get deposited WETH
- `getUserBetsForRound(user, roundId, rpcUrl?)` - Get user bets for a round
- `getUserVolumeWETH(user, rpcUrl?)` - Get user's total WETH volume
- `getLastStakeTime(user, rpcUrl?)` - Get last stake timestamp
- `getHasBetInRound(user, roundId, rpcUrl?)` - Check if user bet in round

#### Rewards
- `pendingStakingRewards(user, rpcUrl?)` - Get pending staking rewards
- `pendingRefiningRewards(user, rpcUrl?)` - Get pending refining rewards
- `estimatePendingUndistributed(user, roundIds, rpcUrl?)` - Estimate pending rewards

#### Automine
- `getAutomineConfig(user, rpcUrl?)` - Get automine configuration
- `getFeeAutominerPerTx(rpcUrl?)` - Get automine fee per transaction

### Write Functions (Transaction Preparation)

Write functions return transaction data that you can sign and send with your wallet.

```typescript
import { prepareMineTx } from 'ore-game-sdk';

const tx = prepareMineTx({ blockIndex: 5, amount: 1000000000000000000n });
// tx = { to: '0x...', data: '0x...', value: 0n }

// Sign and send with your wallet (viem, ethers, etc.)
await walletClient.sendTransaction(tx);
```

#### Mining
- `prepareMineTx({ blockIndex, amount })` - Mine a single block
- `prepareMineBatchTx({ blocks, amountPerBlock })` - Mine multiple blocks

#### Staking
- `prepareStakeTx({ amount })` - Stake ORE
- `prepareUnstakeTx({ amount })` - Unstake ORE
- `prepareClaimStakingRewardsTx()` - Claim staking rewards

#### Claims
- `prepareClaimWinningsTx({ amount })` - Claim winnings
- `prepareClaimRefiningYieldTx()` - Claim refining yield

#### Deposits
- `prepareDepositTokenTx({ amount })` - Deposit WETH
- `prepareWithdrawTokenTx({ amount })` - Withdraw WETH

#### Token Approval
- `prepareApproveTx(spender, amount, tokenAddress?)` - Approve token spending
- `checkAllowance(owner, spender, tokenAddress?, rpcUrl?)` - Check allowance

#### Automine
- `prepareSetAutomineConfigTx({ blocksPerRound, amountPerBlock, remainingRounds })` - Set automine config
- `prepareDeleteAutomineConfigTx()` - Delete automine config

### Batch Calls

Execute multiple read calls in a single RPC request:

```typescript
import { executeBatch, encodeGetRound, decodeGetRound } from 'ore-game-sdk';

const results = await executeBatch([
  {
    request: encodeGetRound(1n),
    decoder: decodeGetRound
  },
  {
    request: encodeGetRound(2n),
    decoder: decodeGetRound
  }
]);

// Or with a custom RPC URL
const results = await executeBatch(calls, 'https://custom-rpc.com');
```

### Cipher Module

Encryption utilities for secure communication:

```typescript
import { initSessionKey, encrypt, decrypt, isKeyInitialized, clearSessionKey } from 'ore-game-sdk';

// Initialize with base64-encoded key
await initSessionKey('your-base64-key');

// Encrypt/decrypt data
const encrypted = await encrypt({ someData: 'value' });
const decrypted = await decrypt(encrypted);
```

## TypeScript

The SDK is fully typed. All types are exported:

```typescript
import type { OreGameConfig, MineArgs, MineBatchArgs } from 'ore-game-sdk';
```

## License

MIT
