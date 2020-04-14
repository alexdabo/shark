export default class Service {
  protected apiURL(endpoint: string): string {
    return process.env.NODE_ENV === 'production' ? `/api${endpoint}` : `/api${endpoint}`
  }
}
