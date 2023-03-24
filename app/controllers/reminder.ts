const { StatusCodes } = require('http-status-codes');
import { NextFunction, Request, Response } from 'express';
const db = require('../models');
const Reminder = db.reminder;

const createReminder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Validate request
  if (!req.body.user) {
    res.status(StatusCodes.BAD_REQUEST).send({
      message: 'Content can not be empty!',
    });
    return;
  }
  // Creating a Reminder
  const reminder = {
    user: req.body.user,
    description: req.body.description,
  };

  await Reminder.create(reminder)
    .then((data: Response) => {
      res.status(StatusCodes.CREATED).send(data);
    })
    .catch((err:any) => {
      next(err);
      res.status(500).send({
        Message: err.message || 'Something went wrong',
      });
    });
};

// Retrieve all Reminders
const getAllReminder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const reminders = await Reminder.findAll({});

  res.status(StatusCodes.OK).json(reminders);
};
// Retrieve single Reminders
const getReminder = async (req: Request, res: Response, next: NextFunction) => {
  let id = req.params.id;

  const reminders = await Reminder.findOne({ where: { id: id } });
  console.log(reminders, 'reminder');
  if (!reminders) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ message: `No Reminders with id ${id}` });
  }
  res.status(200).json(reminders);
};

//Up reminder
const updateReminder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.id;
  const reminder = await Reminder.update(req.body, { where: { id: id } });
  res.status(StatusCodes.OK).json(reminder);
};
//Delete Reminder
const deleteReminder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.id;
  const reminder = await Reminder.destroy({ where: { id: id } });
  if (!reminder.length) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ message: `No Reminders with id ${id}` });
  }
  res.status(StatusCodes.OK).send({ message: 'reminder deleted successfully' });
};

module.exports = {
  createReminder,
  getAllReminder,
  getReminder,
  updateReminder,
  deleteReminder,
};
