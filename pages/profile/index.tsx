import Image from 'next/image';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import useUserType from '@/hooks/useUserType';
import SEO from '@/components/SEO/SEO';
import AccountContainer from '@/components/layout/AccountContainer';
import Header from '@/components/navigation/Header';
import Button from '@/components/UI/Button';
import { logOut } from '@/util/firebase/auth';
import buyIcon from '@/public/img/icons/buyer.svg';
import agentIcon from '@/public/img/icons/agent.svg';

const BUTTONS = [
  {
    link: '/profile/saved-listings',
    text: 'Saved Listings',
  },
  {
    link: '/profile/change-name',
    text: 'Change Name',
  },
  {
    link: '/profile/change-password',
    text: 'Change Password',
  },
  {
    link: '/profile/change-email',
    text: 'Change Email',
  },
];

const ACCOUNT_TYPES = [
  {
    type: 'buyer',
    icon: buyIcon,
  },
  {
    type: 'agent',
    icon: agentIcon,
  },
];

export default function Profile() {
  const user = useSelector((state: RootState) => state.auth.user);
  const router = useRouter();
  const { userType, changeUserType } = useUserType();

  const profileButtons =
    user?.provider === 'password' ? BUTTONS : BUTTONS.slice(0, 2);

  return (
    <>
      <SEO title='Profile | REMAX Metropolis' />
      <Header />
      <AccountContainer>
        <h1 className='mb-8 font-display text-6xl font-[750] text-blue1 md:mb-9 md:text-7xl'>
          <span className='text-gradient'>Profile</span>
        </h1>
        <div className='mb-12 flex flex-col gap-5 md:gap-7'>
          {profileButtons.map((button) => (
            <Button
              type='route'
              route={button.link}
              hierarchy='secondary'
              font='font-[450]'
              padding='py-3'
              classes='w-full text-center'
              key={button.text}
            >
              {button.text}
            </Button>
          ))}
        </div>
        <div className='mb-21 text-left'>
          <p className='mb-6 text-lg font-[450] text-blue1'>
            Are you a buyer or an agent?
          </p>
          <div className='grid grid-cols-2 gap-6 sm:gap-8'>
            {ACCOUNT_TYPES.map((accountType) => (
              <div
                className={`transition-300 cursor-pointer rounded-lg border border-blueGrey2 pb-6 pt-4.5 text-center ${
                  userType === accountType.type ? 'bg-blue1' : 'bg-white'
                }`}
                onClick={() => changeUserType(accountType.type)}
                key={accountType.type}
              >
                <Image
                  src={accountType.icon}
                  alt={`${accountType.type} icon`}
                  className={`mb-2.5 inline-block w-16 ${
                    userType === accountType.type
                      ? 'filter-white'
                      : 'filter-blue1'
                  }`}
                />
                <p
                  className={`transition-300 text-base font-medium sm:text-lg ${
                    userType === accountType.type ? 'text-white' : 'text-blue1'
                  }`}
                >
                  {accountType.type[0].toUpperCase()}
                  {accountType.type.slice(1)}
                </p>
              </div>
            ))}
          </div>
        </div>
        <Button
          type='onClick'
          onClick={async () => {
            await router.replace('/');
            await logOut();
          }}
          hierarchy='primary'
          font='font-[450]'
          padding='py-3'
          classes='w-full text-center'
        >
          Sign Out
        </Button>
      </AccountContainer>
    </>
  );
}
