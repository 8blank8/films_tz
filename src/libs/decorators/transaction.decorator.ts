import { inject } from "inversify"
import { DataSource, EntityManager } from "typeorm"
import { Result } from "../result/result"
import { CustomError } from "../errors/custom.error"

export class TransactionDecorator {
    constructor(
        @inject(DataSource) private dataSource: DataSource
    ) { }

    async doOperation<D, R>(
        data: D,
        operation: (data: D, manager: EntityManager) => Promise<Result<R>>
    ): Promise<Result<R>> {
        const transaction = this.dataSource.createQueryRunner()
        await transaction.connect()
        await transaction.startTransaction()

        try {
            const res = await operation(data, transaction.manager)

            if (res.isSuccess()) {
                await transaction.commitTransaction()
            } else {
                await transaction.rollbackTransaction()
            }
            return res
        } catch (err) {
            await transaction.rollbackTransaction()
            return Result.error(new CustomError('server error'))
        } finally {
            await transaction.release()
        }
    }
}
