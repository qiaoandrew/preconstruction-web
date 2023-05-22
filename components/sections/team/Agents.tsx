import AgentCard from '@/components/cards/AgentCard';
import Row3 from '@/components/layout/Row3';
import { AgentType } from '@/types/types';

type AgentsProps = {
  team: AgentType[];
};

export default function Agents({ team }: AgentsProps) {
  return (
    <section className='mx-container-sm mb-section' id='our-agents'>
      <h2 className='h2 mb-5 md:mb-7'>Our Agents</h2>
      <Row3>
        {team.map((agent) => (
          <AgentCard key={agent.name} {...agent} />
        ))}
      </Row3>
    </section>
  );
}
