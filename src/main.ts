import { WitService } from './WitService';

VSS.require(["TFS/Dashboards/WidgetHelpers", "TFS/WorkItemTracking/RestClient"], function (WidgetHelpers, TFS_Wit_WebApi) {
  WidgetHelpers.IncludeWidgetStyles();
  VSS.register("FirstWidget", function () {
    const projectId = VSS.getWebContext().project.id;
    const witService = new WitService(TFS_Wit_WebApi, WidgetHelpers);

    return {
      load: (widgetSettings) => {
        const $title = $('h2.title');
        $title.text('Hello World');

        return witService.getQueryInfo(widgetSettings, projectId);
      },
      reload: (widgetSettings) => {
        return witService.getQueryInfo(widgetSettings, projectId);
      }
    }
  });
  VSS.notifyLoadSucceeded();
});
