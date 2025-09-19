import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Wallet, Key, Zap, Lock, Network, Database } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useDisconnect } from 'wagmi';

const WalletConnection = () => {
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const { toast } = useToast();

  const handleDisconnect = () => {
    disconnect();
    toast({
      title: "Wallet Disconnected",
      description: "Your wallet has been safely disconnected.",
      variant: "destructive",
    });
  };

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 neon-pulse">
            Secure Wallet Integration
          </h2>
          <p className="text-muted-foreground text-lg">
            Connect your wallet to start making confidential cross-border payments
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Wallet Connection Card */}
          <Card className="cyber-gradient border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wallet className="text-primary" />
                Wallet Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {!isConnected ? (
                <div className="text-center space-y-4">
                  <div className="w-24 h-24 mx-auto rounded-full border-2 border-dashed border-primary/50 flex items-center justify-center">
                    <Wallet className="w-12 h-12 text-primary/50" />
                  </div>
                  <p className="text-muted-foreground">No wallet connected</p>
                  <ConnectButton.Custom>
                    {({
                      account,
                      chain,
                      openAccountModal,
                      openChainModal,
                      openConnectModal,
                      authenticationStatus,
                      mounted,
                    }) => {
                      const ready = mounted && authenticationStatus !== 'loading';
                      const connected =
                        ready &&
                        account &&
                        chain &&
                        (!authenticationStatus ||
                          authenticationStatus === 'authenticated');

                      return (
                        <div
                          {...(!ready && {
                            'aria-hidden': true,
                            'style': {
                              opacity: 0,
                              pointerEvents: 'none',
                              userSelect: 'none',
                            },
                          })}
                        >
                          {(() => {
                            if (!connected) {
                              return (
                                <Button 
                                  onClick={openConnectModal}
                                  className="w-full neon-gradient hover:opacity-90 transition-opacity"
                                  size="lg"
                                >
                                  <Wallet className="mr-2" />
                                  Connect Wallet
                                </Button>
                              );
                            }

                            if (chain.unsupported) {
                              return (
                                <Button 
                                  onClick={openChainModal}
                                  variant="destructive"
                                  className="w-full"
                                  size="lg"
                                >
                                  Wrong network
                                </Button>
                              );
                            }

                            return (
                              <div className="text-center space-y-4">
                                <div className="w-24 h-24 mx-auto rounded-full border-2 border-primary neon-glow flex items-center justify-center">
                                  <Wallet className="w-12 h-12 text-primary" />
                                </div>
                                <div className="space-y-2">
                                  <Badge variant="secondary" className="bg-neon-green/10 text-neon-green border-neon-green/20">
                                    Connected
                                  </Badge>
                                  <p className="text-sm text-muted-foreground font-mono">
                                    {account.displayName}
                                  </p>
                                </div>
                                <Button 
                                  onClick={handleDisconnect}
                                  variant="outline"
                                  className="w-full border-destructive/50 text-destructive hover:bg-destructive/10"
                                >
                                  Disconnect
                                </Button>
                              </div>
                            );
                          })()}
                        </div>
                      );
                    }}
                  </ConnectButton.Custom>
                </div>
              ) : (
                <div className="text-center space-y-4">
                  <div className="w-24 h-24 mx-auto rounded-full border-2 border-primary neon-glow flex items-center justify-center">
                    <Wallet className="w-12 h-12 text-primary" />
                  </div>
                  <div className="space-y-2">
                    <Badge variant="secondary" className="bg-neon-green/10 text-neon-green border-neon-green/20">
                      Connected
                    </Badge>
                    <p className="text-sm text-muted-foreground font-mono">
                      {address?.slice(0, 6)}...{address?.slice(-4)}
                    </p>
                  </div>
                  <Button 
                    onClick={handleDisconnect}
                    variant="outline"
                    className="w-full border-destructive/50 text-destructive hover:bg-destructive/10"
                  >
                    Disconnect
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
          
          {/* Features Grid */}
          <div className="space-y-6">
            <div className="grid gap-4">
              <Card className="border-neon-green/20">
                <CardContent className="p-4 flex items-center gap-3">
                  <Key className="text-neon-green w-8 h-8" />
                  <div>
                    <h3 className="font-semibold text-neon-green">Cryptographic Privacy</h3>
                    <p className="text-sm text-muted-foreground">
                      Transaction amounts visible only to you and recipient
                    </p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-neon-blue/20">
                <CardContent className="p-4 flex items-center gap-3">
                  <Zap className="text-neon-blue w-8 h-8" />
                  <div>
                    <h3 className="font-semibold text-neon-blue">Instant Settlement</h3>
                    <p className="text-sm text-muted-foreground">
                      Real-time cross-border payments with minimal fees
                    </p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-neon-purple/20">
                <CardContent className="p-4 flex items-center gap-3">
                  <Database className="text-neon-purple w-8 h-8" />
                  <div>
                    <h3 className="font-semibold text-neon-purple">FHE Technology</h3>
                    <p className="text-sm text-muted-foreground">
                      Fully homomorphic encryption for maximum privacy
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WalletConnection;