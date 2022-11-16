import { ConnectionService } from "../connection/connection";
import { updateUser, Users, createUser, deleteUser } from "../grapql/schemas";
export class UserService {
  static getMongoUsers(pagination, res, error) {
    const client = ConnectionService.getGraphqClient();
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
    const client = ConnectionService.getGraphqClient();
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

  static createUser(User, res, error) {
    console.log(User);
    const client = ConnectionService.getGraphqClient();
    client
      .mutate({
        mutation: createUser,
        variables: {
          UserInput: User,
        },
      })
      .then((response) => {
        const { createUser } = response?.data;
        res && res({ createUser });
      })
      .catch((e) => {
        error && error(e);
      });
  }

  static deleteUser(id, res, error) {
    const client = ConnectionService.getGraphqClient();
    client
      .mutate({
        mutation: deleteUser,
        variables: {
          id: id,
        },
      })
      .then((response) => {
        const { deleteUser } = response?.data;
        res && res({ deleteUser });
      })
      .catch((e) => {
        error && error(e);
      });
  }
}
