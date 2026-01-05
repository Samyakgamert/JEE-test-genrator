import React, { useState } from 'react';
import { PracticeConfig } from '../components/PracticeConfig';
import { TestInterface } from '../components/TestInterface';

export const Practice: React.FC = () => {
  const [config, setConfig] = useState<any | null>(null);

  if (config) {
    return <TestInterface config={config} onExit={() => setConfig(null)} />;
  }

  return <PracticeConfig onStart={setConfig} />;
};
