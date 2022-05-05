import { Auth0Provider } from '@bcwdev/auth0provider'
import { accountService } from '../services/AccountService'
import BaseController from '../utils/BaseController'

export class AccountController extends BaseController {
  constructor() {
    super('account')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getUserAccount)
      // .put('')
      // TODO put request
  }

  async getUserAccount(req, res, next) {
    try {
      const account = await accountService.getAccount(req.userInfo)
      res.send(account)
    } catch (error) {
      next(error)
    }
  }

  async editAccount(req, res, next) {
    try {
      req.body.id = req.params.id
      const updatedAccount = await accountService.updateAccount(req.body, req.userInfo.id)
      res.send(updatedAccount)
    } catch (error) {
      next(error)
    }
  }
  //TODO edit account info
  //function to edit is written in the service but not in the controller
}
