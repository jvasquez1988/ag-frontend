import { ConnectionService } from "../connection/connection";
import { updateUser, Users } from "../grapql/schemas";
export class UserService {
  static getMongoUsers(pagination, res, error) {
    const client = ConnectionService.getGraphqClientWithJWT();
    client
      .query({
        query: Users,
        variables: {
          start: pagination?.start,
          limit: pagination?.limit,
        },
      })
      .then((response) => {
        const { Users } = response?.data;
        res && res({ Users });
        return { Users };
      })
      .catch((e) => {
        error && error(e);
      });
  }

  static updateUser(id, User, res, error) {
    const client = ConnectionService.getGraphqClientWithJWT();
    client
      .mutate({
        mutation: updateUser,
        variables: {
          id: id,
          input: User,
        },
      })
      .then((response) => {
        const { updateUser } = response?.data;
        res && res({ updateUser });
      })
      .catch((e) => {
        error && error(e);
      });
  }
}
