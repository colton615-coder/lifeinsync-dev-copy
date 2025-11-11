import { PinGate } from '@/components/auth/PinGate';
import { JournalVault } from './JournalVault';

export default function VaultPage() {
  return (
    <PinGate>
      <JournalVault />
    </PinGate>
  );
}
