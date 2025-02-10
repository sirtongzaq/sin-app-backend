import { t } from "elysia";

export const responseDTO = t.Object({
  status: t.String().default("S"), // S or F (Ex. Success and Fail)
  message: t.String().default("SUCCESS"), // respone message from response (Ex. SUCCESS FAIL ERROR_MSG)
  data: t.Optional(t.Unknown()), // respone data (Ex. rawdata mapdata emptydata for case nodata)
});

export type responseDTO = typeof responseDTO.static;
