import * as url from 'url';
import { HostingEnvironment } from '../auth/HostingEnvironment';

export class UrlHelper {
  public static removeTrailingSlash(url: string): string {
    return url.replace(/(\/$)|(\\$)/, '');
  }

  public static removeLeadingSlash(url: string): string {
    return url.replace(/(^\/)|(^\\)/, '');
  }

  public static trimSlashes(url: string): string {
    return url.replace(/(^\/)|(^\\)|(\/$)|(\\$)/g, '');
  }

  public static ResolveHostingEnvironment(siteUrl: string): HostingEnvironment {
    const host: string = (url.parse(siteUrl)).host;

    if (host.endsWith('.sharepoint.com')) {
      return HostingEnvironment.Production;
    } else if (host.endsWith('.sharepoint.cn')) {
      return HostingEnvironment.China;
    } else if (host.endsWith('.sharepoint.de')) {
      return HostingEnvironment.German;
    } else if (host.endsWith('.sharepoint-mil.us')) {
      return HostingEnvironment.USDefence;
    } else if (host.endsWith('.sharepoint.us')) {
      return HostingEnvironment.USGovernment;
    }

    return HostingEnvironment.Production; // As default, for O365 Dedicated, #ToInvestigate
    // throw new Error('Unable to resolve hosting environment. Site url: ' + siteUrl);
  }
}
