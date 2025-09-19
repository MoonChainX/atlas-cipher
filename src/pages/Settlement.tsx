import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Wallet, Key, Lock, ArrowRight, CheckCircle, Globe, Network, Database } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import WalletConnection from '@/components/WalletConnection';
import Navigation from '@/components/Navigation';

const Settlement = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    recipientAddress: '',
    amount: '',
    currency: 'USDT',
    recipient: '',
    memo: ''
  });
  const { toast } = useToast();

  const handleProcessSettlement = async () => {
    setIsProcessing(true);
    
    // Simulate settlement processing
    setTimeout(() => {
      setCurrentStep(4);
      setIsProcessing(false);
      
      toast({
        title: "Settlement Complete",
        description: "Your confidential payment has been processed successfully.",
      });
    }, 3000);
  };

  const steps = [
    { id: 1, title: "Connect Wallet", icon: Wallet },
    { id: 2, title: "Enter Details", icon: Key },
    { id: 3, title: "Confirm & Send", icon: Lock },
    { id: 4, title: "Settlement Complete", icon: CheckCircle }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Progress Header */}
      <section className="pt-24 pb-12 px-4 border-b border-primary/10">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4 neon-pulse">
              Confidential Settlement Process
            </h1>
            <p className="text-muted-foreground">
              Secure cross-border payments with encrypted transaction amounts
            </p>
          </div>
          
          {/* Progress Steps */}
          <div className="flex items-center justify-between max-w-2xl mx-auto">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-colors ${
                  currentStep >= step.id 
                    ? 'border-primary bg-primary text-primary-foreground' 
                    : 'border-muted-foreground text-muted-foreground'
                }`}>
                  <step.icon className="w-5 h-5" />
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-16 h-0.5 mx-4 transition-colors ${
                    currentStep > step.id ? 'bg-primary' : 'bg-muted-foreground/20'
                  }`} />
                )}
              </div>
            ))}
          </div>
          
          <div className="text-center mt-4">
            <Badge variant="secondary">
              Step {currentStep} of {steps.length}: {steps.find(s => s.id === currentStep)?.title}
            </Badge>
          </div>
        </div>
      </section>
      
      {/* Main Content */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          {currentStep === 1 && <WalletConnection />}
          
          {currentStep === 2 && (
            <Card className="cyber-gradient border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Key className="text-primary" />
                  Enter Settlement Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="recipient">Recipient Name</Label>
                      <Input
                        id="recipient"
                        placeholder="Enter recipient name"
                        value={formData.recipient}
                        onChange={(e) => setFormData({...formData, recipient: e.target.value})}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="recipientAddress">Recipient Wallet Address</Label>
                      <Input
                        id="recipientAddress"
                        placeholder="0x742d35cc6bf44a52e4f..."
                        value={formData.recipientAddress}
                        onChange={(e) => setFormData({...formData, recipientAddress: e.target.value})}
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="amount">Amount</Label>
                        <Input
                          id="amount"
                          type="number"
                          placeholder="1000.00"
                          value={formData.amount}
                          onChange={(e) => setFormData({...formData, amount: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="currency">Currency</Label>
                        <Select value={formData.currency} onValueChange={(value) => setFormData({...formData, currency: value})}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="USDT">USDT</SelectItem>
                            <SelectItem value="USDC">USDC</SelectItem>
                            <SelectItem value="ETH">ETH</SelectItem>
                            <SelectItem value="BTC">BTC</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="memo">Memo (Optional)</Label>
                      <Input
                        id="memo"
                        placeholder="Payment reference"
                        value={formData.memo}
                        onChange={(e) => setFormData({...formData, memo: e.target.value})}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <Card className="border-neon-green/20">
                      <CardContent className="p-4">
                        <h3 className="font-semibold text-neon-green mb-2 flex items-center gap-2">
                          <Key className="w-4 h-4" />
                          Privacy Features
                        </h3>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          <li>• Transaction amount encrypted</li>
                          <li>• FHE cryptographic validation</li>
                          <li>• Private memo encryption</li>
                          <li>• Recipient anonymity protection</li>
                        </ul>
                      </CardContent>
                    </Card>
                    
                    <Card className="border-neon-blue/20">
                      <CardContent className="p-4">
                        <h3 className="font-semibold text-neon-blue mb-2 flex items-center gap-2">
                          <Globe className="w-4 h-4" />
                          Settlement Info
                        </h3>
                        <div className="text-sm space-y-1">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Network Fee:</span>
                            <span>0.1%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Processing Time:</span>
                            <span>~30 seconds</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Confirmation:</span>
                            <span>Instant</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
                
                <Separator />
                
                <div className="flex justify-between">
                  <Button variant="outline" onClick={() => setCurrentStep(1)}>
                    Back
                  </Button>
                  <Button 
                    onClick={() => setCurrentStep(3)}
                    disabled={!formData.recipientAddress || !formData.amount}
                    className="neon-gradient"
                  >
                    Continue to Confirmation
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
          
          {currentStep === 3 && (
            <Card className="cyber-gradient border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="text-primary" />
                  Confirm Settlement
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-card/50 p-6 rounded-lg border border-primary/20">
                  <h3 className="font-semibold mb-4">Settlement Summary</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Recipient:</span>
                      <span>{formData.recipient}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Address:</span>
                      <span className="font-mono text-sm">{formData.recipientAddress.slice(0, 10)}...{formData.recipientAddress.slice(-8)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Amount:</span>
                      <span className="font-bold text-lg">{formData.amount} {formData.currency}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Network Fee:</span>
                      <span>{(parseFloat(formData.amount) * 0.001).toFixed(3)} {formData.currency}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total Amount:</span>
                      <span>{(parseFloat(formData.amount) + parseFloat(formData.amount) * 0.001).toFixed(3)} {formData.currency}</span>
                    </div>
                  </div>
                </div>
                
                <Card className="border-amber-500/20 bg-amber-500/5">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <Lock className="w-5 h-5 text-amber-500 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-amber-500">Encryption Notice</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          Once confirmed, the transaction amount will be cryptographically sealed. 
                          Only you and the recipient will be able to view the settlement details.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <div className="flex justify-between">
                  <Button variant="outline" onClick={() => setCurrentStep(2)}>
                    Back to Edit
                  </Button>
                  <Button 
                    onClick={handleProcessSettlement}
                    disabled={isProcessing}
                    className="neon-gradient"
                    size="lg"
                  >
                    {isProcessing ? (
                      <>
                        <div className="w-4 h-4 border-2 border-primary/30 border-t-primary rounded-full animate-spin mr-2" />
                        Processing Settlement...
                      </>
                    ) : (
                      <>
                        Confirm & Send Payment
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
          
          {currentStep === 4 && (
            <Card className="cyber-gradient border-neon-green/20 text-center">
              <CardContent className="p-12">
                <CheckCircle className="w-24 h-24 text-neon-green mx-auto mb-6 neon-glow" />
                <h2 className="text-3xl font-bold text-neon-green mb-4">Settlement Complete!</h2>
                <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                  Your confidential payment of {formData.amount} {formData.currency} has been successfully 
                  processed and encrypted for recipient {formData.recipient}.
                </p>
                
                <div className="bg-card/50 p-4 rounded-lg border border-neon-green/20 mb-6 max-w-md mx-auto">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Transaction ID:</span>
                      <span className="font-mono">0xabc123...def456</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Status:</span>
                      <Badge className="bg-neon-green/10 text-neon-green border-neon-green/20">Confirmed</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Block Height:</span>
                      <span>#18,547,892</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-4 justify-center">
                  <Button variant="outline" onClick={() => setCurrentStep(1)}>
                    New Settlement
                  </Button>
                  <Button className="neon-gradient">
                    View Transaction History
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </section>
    </div>
  );
};

export default Settlement;