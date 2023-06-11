import { useEffect, useState } from 'react';
import Row3 from '@/components/layout/Row3';
import AgentCard from '@/components/cards/AgentCard';
import { AgentType } from '@/types/types';
import { getTeam } from '@/util/firebase/team';

type AgentsProps = {
  team: AgentType[];
};

export default function Agents({ team: fetchedTeam }: AgentsProps) {
  const [team, setTeam] = useState<AgentType[]>([]);

  useEffect(() => {
    const fetchTeam = async () => {
      const team = await getTeam();
      setTeam(team);
    };
    fetchTeam();
  }, []);

  return (
    <section className='mx-container-sm mb-section' id='our-agents'>
      <h2 className='h2 mb-5 md:mb-7'>Our Agents</h2>
      <Row3>
        {(team || fetchedTeam).map((agent) => (
          <AgentCard key={agent.name} {...agent} />
        ))}
      </Row3>
    </section>
  );
}
