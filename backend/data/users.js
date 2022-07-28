import bcrypt from 'bcryptjs';

const Users = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: bcrypt.hashSync('umaSenhaIncrivelmenteDificil', 10),
    isAdmin: true,
  },
  {
    name: 'john doe',
    email: 'johndoe@example.com',
    password: bcrypt.hashSync('umaSenhaIncrivelmenteDificil', 10),
  },
  {
    name: 'gui de paula',
    email: 'guidepaula@example.com',
    password: bcrypt.hashSync('umaSenhaIncrivelmenteDificil', 10),
  },
];

export default Users;
