// TODO: REMOVE AFTER FIRST PAGE IS IMPLEMENTED
import { createQueryService } from "@bufbuild/connect-query";
import { ReportsPublicService } from "@safetyculture/s12-apis-connect-web/s12/reports/v1/public_connect";

export const publicReportQueryService = createQueryService({
  service: ReportsPublicService,
});
