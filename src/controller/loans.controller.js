import loanServices from "../service/loan.services.js";

async function createLoanController(req, res) {
  const userId = req.userId;
  const { bookId, dueDate } = req.body;
  try {
    const bookCreated = await loanServices.createLoansService(
      userId,
      bookId,
      dueDate
    );
    res.status(201).send(bookCreated);
  } catch (error) {
    res.status(401).send(error.message);
  }
}

async function findAllLoansController(req, res) {
  try {
    const loans = await loanServices.findAllLoansService();
    res.status(200).send({ loans });
  } catch (error) {
    res.status(400).send(error.message);
  }
}
export default {
  createLoanController,
  findAllLoansController,
};
