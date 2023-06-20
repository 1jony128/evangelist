import cls from './Navbar.module.scss';
import {classNames} from 'shared/lib/classNames';
import {FC} from 'react';
import {Link, useLocation} from 'react-router-dom';
import {HStack} from 'shared/ui/Stack';

interface NavbarProps {
  className?: string;
}

const links = [
  {
    value: '/',
    name: 'Карта',
  },
  {
    value: '/group',
    name: 'Группы',
  },
  {
    value: '/rating',
    name: 'Рейтинг',
  },
  {
    value: '/profile',
    name: 'Профиль',
  },
];

const Navbar: FC<NavbarProps> = ({className}) => {
  const location = useLocation();

  return (
    <HStack
      max
      gap={'16'}
      justify={'between'}
      className={classNames(cls.Navbar, {}, [className])}
    >
      {links.map(({value, name}) => (
        <Link
          to={value}
          className={classNames(cls.Button, {
            [cls.active]: location.pathname === value,
          })}
          key={value}
        >
          {name}
        </Link>
      ))}
    </HStack>
  );
};

export default Navbar;
