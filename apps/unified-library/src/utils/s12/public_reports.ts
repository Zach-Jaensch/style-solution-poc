// TODO: REMOVE AFTER FIRST PAGE IS IMPLEMENTED

import { ReportsPublicService } from "@safetyculture/s12-apis-connect-web/s12/reports/v1/public_connect";
import { createQueryService } from "@bufbuild/connect-query";

export const publicReportQueryService = createQueryService({
  service: ReportsPublicService,
});
