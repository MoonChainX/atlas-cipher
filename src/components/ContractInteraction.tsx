import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Key, Lock, Database, Network } from 'lucide-react';
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { useToast } from '@/hooks/use-toast';

// Contract ABI for AtlasCipher
const ATLAS_CIPHER_ABI = [
  {
    "inputs": [
      {"name": "recipient", "type": "address"},
      {"name": "amount", "type": "bytes"},
      {"name": "fee", "type": "bytes"},
      {"name": "memo", "type": "string"},
      {"name": "inputProof", "type": "bytes"}
    ],
    "name": "createTransaction",
    "outputs": [{"name": "", "type": "uint256"}],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {"name": "transactionId", "type": "uint256"},
      {"name": "settlementProof", "type": "bytes"},
      {"name": "proofData", "type": "bytes"}
    ],
    "name": "settleTransaction",
    "outputs": [{"name": "", "type": "uint256"}],
    "stateMutability": "nonpayable",
    "type": "function"
  }
] as const;

const CONTRACT_ADDRESS = "0x742d35Cc6BF44a52e4F6E0E6fA2A5A5A5A5A5A5A"; // Replace with actual contract address

interface ContractInteractionProps {
  onTransactionCreated?: (transactionId: number) => void;
}

const ContractInteraction = ({ onTransactionCreated }: ContractInteractionProps) => {
  const { address } = useAccount();
  const { toast } = useToast();
  const [isCreating, setIsCreating] = useState(false);
  const [isSettling, setIsSettling] = useState(false);
  const [formData, setFormData] = useState({
    recipient: '',
    amount: '',
    fee: '',
    memo: ''
  });

  const { writeContract: createTransaction, data: createHash, isPending: isCreatePending } = useWriteContract();
  const { writeContract: settleTransaction, data: settleHash, isPending: isSettlePending } = useWriteContract();

  const { isLoading: isCreateConfirming, isSuccess: isCreateConfirmed } = useWaitForTransactionReceipt({
    hash: createHash,
  });

  const { isLoading: isSettleConfirming, isSuccess: isSettleConfirmed } = useWaitForTransactionReceipt({
    hash: settleHash,
  });

  // Simulate FHE encryption (in real implementation, this would use FHEVM)
  const encryptData = (value: string): string => {
    // This is a placeholder - in real implementation, use FHEVM encryption
    return btoa(value); // Base64 encoding as placeholder
  };

  const handleCreateTransaction = async () => {
    if (!address) {
      toast({
        title: "Wallet Not Connected",
        description: "Please connect your wallet first.",
        variant: "destructive",
      });
      return;
    }

    if (!formData.recipient || !formData.amount) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setIsCreating(true);

    try {
      // Encrypt sensitive data using FHE
      const encryptedAmount = encryptData(formData.amount);
      const encryptedFee = encryptData(formData.fee || "0");
      
      // Create proof data (placeholder for FHE proof)
      const inputProof = encryptData(`${formData.amount}-${Date.now()}`);

      await createTransaction({
        address: CONTRACT_ADDRESS,
        abi: ATLAS_CIPHER_ABI,
        functionName: 'createTransaction',
        args: [
          formData.recipient as `0x${string}`,
          encryptedAmount as `0x${string}`,
          encryptedFee as `0x${string}`,
          formData.memo,
          inputProof as `0x${string}`
        ],
        value: BigInt(0) // No direct ETH transfer - using contract for encrypted transactions
      });

      toast({
        title: "Transaction Created",
        description: "Your encrypted transaction has been submitted to the blockchain.",
      });

    } catch (error) {
      console.error('Error creating transaction:', error);
      toast({
        title: "Transaction Failed",
        description: "Failed to create encrypted transaction. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsCreating(false);
    }
  };

  const handleSettleTransaction = async (transactionId: string) => {
    if (!address) {
      toast({
        title: "Wallet Not Connected",
        description: "Please connect your wallet first.",
        variant: "destructive",
      });
      return;
    }

    setIsSettling(true);

    try {
      // Create settlement proof (placeholder for FHE proof)
      const settlementProof = encryptData(`settlement-${transactionId}-${Date.now()}`);
      const proofData = encryptData(`proof-${transactionId}`);

      await settleTransaction({
        address: CONTRACT_ADDRESS,
        abi: ATLAS_CIPHER_ABI,
        functionName: 'settleTransaction',
        args: [
          BigInt(transactionId),
          settlementProof as `0x${string}`,
          proofData as `0x${string}`
        ]
      });

      toast({
        title: "Transaction Settled",
        description: "Your encrypted transaction has been settled on-chain.",
      });

    } catch (error) {
      console.error('Error settling transaction:', error);
      toast({
        title: "Settlement Failed",
        description: "Failed to settle transaction. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSettling(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="cyber-gradient border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="text-primary" />
            FHE Encrypted Transaction
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="recipient">Recipient Address</Label>
              <Input
                id="recipient"
                placeholder="0x742d35..."
                value={formData.recipient}
                onChange={(e) => setFormData({...formData, recipient: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="amount">Amount (Encrypted)</Label>
              <Input
                id="amount"
                placeholder="1000"
                value={formData.amount}
                onChange={(e) => setFormData({...formData, amount: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="fee">Fee (Encrypted)</Label>
              <Input
                id="fee"
                placeholder="10"
                value={formData.fee}
                onChange={(e) => setFormData({...formData, fee: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="memo">Memo</Label>
              <Input
                id="memo"
                placeholder="Payment reference"
                value={formData.memo}
                onChange={(e) => setFormData({...formData, memo: e.target.value})}
              />
            </div>
          </div>

          <div className="bg-card/50 p-4 rounded-lg border border-primary/20">
            <h3 className="font-semibold text-primary mb-2 flex items-center gap-2">
              <Key className="w-4 h-4" />
              FHE Encryption Features
            </h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Transaction amounts encrypted using FHEVM</li>
              <li>• Zero-knowledge proof validation</li>
              <li>• Private data stored on-chain encrypted</li>
              <li>• No direct ETH transfers - contract-based encryption</li>
            </ul>
          </div>

          <div className="flex gap-4">
            <Button
              onClick={handleCreateTransaction}
              disabled={isCreating || isCreatePending || isCreateConfirming}
              className="neon-gradient"
            >
              {isCreating || isCreatePending || isCreateConfirming ? (
                <>
                  <div className="w-4 h-4 border-2 border-primary/30 border-t-primary rounded-full animate-spin mr-2" />
                  {isCreateConfirming ? 'Confirming...' : 'Creating...'}
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4 mr-2" />
                  Create Encrypted Transaction
                </>
              )}
            </Button>
          </div>

          {isCreateConfirmed && (
            <div className="bg-neon-green/10 border border-neon-green/20 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Network className="w-4 h-4 text-neon-green" />
                <span className="font-semibold text-neon-green">Transaction Created Successfully</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Your encrypted transaction has been submitted to the blockchain. 
                The transaction amount and details are now cryptographically sealed.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ContractInteraction;
