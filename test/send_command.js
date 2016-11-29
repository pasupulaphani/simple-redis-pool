require("should");
const RedisPool = require("../lib/redis_pool");

describe("sendCommand", () => {

  const options = {
    redisOptions: {
      host: process.env.REDIS_HOST || "127.0.0.1"
    }
  };

  const key = "MyNameIs";
  const value = "RealSlimShady";
  const pool = new RedisPool(options);

  beforeEach(() => pool.sendCommand("del", "*"));

  it("should execute given command", () => {

    return pool.sendCommand("set", [key, value])
      .then(() => pool.sendCommand("get", [key]))
      .should.eventually.be.equal(value);
  });

  it("should reject when cmd failed", () => {

    return pool.sendCommand("keys")
      .should.be.rejectedWith(/ERR wrong number of arguments for 'keys' command/);
  });
});
