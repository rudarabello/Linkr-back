import * as usersRepository from '../repositories/usersRepository.js';

export const getUsersListByName = async (req, res) => {
  const { name } = req.params;
  if (!name) {
    return res.status(403).send('Param can be not empaty');
  }
  try {
    const { rows: list } = await usersRepository.getUsersListByName(name);
    res.send(list);
  } catch (error) {
    res.sendStatus(500);
  }
};
