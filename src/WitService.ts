export class WitService {
  constructor(
      private readonly TFS_Wit_WebApi: any,
      private readonly WidgetHelpers: any,
  ) {
  }

  getQueryInfo(widgetSettings: any, projectId: string, query?: string) {
    if (!query) {
      const settings = JSON.parse(widgetSettings.customSettings.data);
      if (!settings || !settings.queryPath) {
        const $container = $('#query-info-container');
        $container.empty();
        $container.text("Sorry nothing to show, please configure a query path.");

        return this.WidgetHelpers.WidgetStatusHelper.Success();
      }

      query = settings.queryPath
    }
    return this.TFS_Wit_WebApi.getClient().getQuery(projectId, query)
        .then((query) => {
          const $list = $('<ul>');
          $list.append($('<li>').text("Query Id: " + query.id));
          $list.append($('<li>').text("Query Name: " + query.name));
          $list.append($('<li>').text("Created By: " + (query.createdBy ? query.createdBy.displayName : "<unknown>")));

          const $container = $('#query-info-container');
          $container.empty();
          $container.append($list);

          return this.WidgetHelpers.WidgetStatusHelper.Success();
        }, (error) => {
          return this.WidgetHelpers.WidgetStatusHelper.Failure(error.message);
        });
  }

}
