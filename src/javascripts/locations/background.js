var client = ZAFClient.init();
client.get("currentUser").then(function (currentUser) {
  if (currentUser.currentUser.role == "admin") {
    client.get("instances").then(function (instancesData) {
      var instances = instancesData.instances;
      for (var instanceGuid in instances) {
        if (instances[instanceGuid].location === "nav_bar") {
          let instance = client.instance(instanceGuid);
          instance.invoke("show");
        }
      }
    });
  }
});
