import loanRepositories from "../repositories/loan.repositories.js";

async function createLoansService(userId, bookId, dueDate) {
  const createdLoan = await loanRepositories.createLoanRepository(
    userId,
    bookId,
    dueDate
    );
    if (!createdLoan) throw new Error('Error creating Loan');
    return createdLoan;
}

async function findAllLoansService() {
    const loans = await loanRepositories.findAllLoansRepository()
    return loans;
}

export default {
    findAllLoansService,
    createLoansService
}
