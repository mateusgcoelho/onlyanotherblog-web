export interface IUseCaseExecutor<Return, Props> {
  execute(data: Props): Return;
}
