import React from 'react';
import { FlaskConical, Network } from 'lucide-react';
import SystemsNodeGraph from '../components/SystemsNodeGraph';
import BreakfastFoosball from '../components/BreakfastFoosball';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Playground: React.FC = () => {
  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 text-xs font-medium tracking-wider text-brand uppercase">
          <FlaskConical className="size-3.5" />
          Interactive Labs
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Project Playground
        </h1>
        <p className="max-w-2xl text-base text-muted-foreground">
          A dedicated space for interactive simulations, physics prototypes, and playful technical experiments.
        </p>
      </div>

      <section>
        <BreakfastFoosball />
      </section>

      <section>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <Network className="size-5 text-brand" />
              Interactive System Design Principles
            </CardTitle>
            <CardDescription>
              Explore the interconnected nature of complex systems. Click and drag nodes to interact with the force-directed graph.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SystemsNodeGraph />
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default Playground;
