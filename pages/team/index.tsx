import { GetServerSideProps } from 'next';
import SEO from '@/components/SEO/SEO';
import Header from '@/components/navigation/Header';
import Hero from '@/components/sections/team/Hero';
import { getTeam } from '@/util/firebase/team';
import Milestones from '@/components/sections/team/Milestones';
import Footer from '@/components/navigation/Footer';
import Agents from '@/components/sections/team/Agents';
import { AgentType } from '@/types/types';

type TeamProps = {
  team: AgentType[];
};

export default function Team({ team }: TeamProps) {
  return (
    <>
      <SEO title='Team | REMAX Metropolis' />
      <Header />
      <Hero />
      <Milestones />
      <Agents team={team} />
      <Footer />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const team = await getTeam();
  return {
    props: {
      team,
    },
  };
};
