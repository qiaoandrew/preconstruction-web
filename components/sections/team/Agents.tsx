import AgentCard from '@/components/cards/AgentCard';
import Row3 from '@/components/layout/Row3';

export type Agent = {
  name: string;
  email?: string;
  phone?: string;
  image?: string;
  position: string;
};

type AgentsProps = {
  team: Agent[];
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
