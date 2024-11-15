import cron from "node-cron";
import moment from "moment";
import loanRepositories from "../repositories/loan.repositories.js";
import userRepository from "../repositories/user.repositories.js";
import bookRepository from "../repositories/book.repositories.js";
import sendEmail from "../service/email.services.js"

cron.schedule("19 * * * *", async () => {
  console.log("Running daily job to check for due dates...");
  const loans = await loanRepositories.findAllLoansRepository();
  console.log(loans);
  const today = moment().startOf("day");

  for (const loan of loans) {
    const dueDate = moment(loan.dueDate).startOf("day");
    const reminderDueDate = moment(dueDate).subtract(1, "days");
    const userLoan = await userRepository.findUserByIdRepository(loan.userId);
      const bookLoan = await bookRepository.findByIdBookRespository(loan.bookId);
      console.log(reminderDueDate)
      console.log(today)
    if (today.isSame(reminderDueDate)) {
      sendEmail(userLoan.email, bookLoan.title, loan.dueDate);
    }
  }
});
