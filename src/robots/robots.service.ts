import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import * as robotsParser from 'robots-parser';
import { catchError, firstValueFrom, of } from 'rxjs';

@Injectable()
export class RobotsService {
  constructor(private readonly httpService: HttpService) {}

  async parseFrom(urls: string[]) {
    const requests = urls.map(async (url) => {
      const { origin } = new URL(url);
      const robotsUrl = `${origin}/robots.txt`;

      const http = this.httpService
        .get(robotsUrl)
        .pipe(catchError(() => of({ data: '' })));

      const { data } = await firstValueFrom(http);
      const parser = (robotsParser as unknown as typeof robotsParser.default)(
        robotsUrl,
        data,
      );

      return [origin, parser] as [string, robotsParser.Robot];
    });

    const promises = await Promise.all(requests);
    const parsers = new Map(promises);

    return parsers;
  }
}
