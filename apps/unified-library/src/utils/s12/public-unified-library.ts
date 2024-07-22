import { createQueryService } from "@bufbuild/connect-query";
import { PublicContentLibraryService } from "@safetyculture/s12-apis-connect-web/s12/contentlibrary/v1/public_connect";

export const publicUnifiedLibraryQueryService = createQueryService({
  service: PublicContentLibraryService,
});
