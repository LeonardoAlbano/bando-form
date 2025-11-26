import { ApplicationRepository } from "./application.repository";
import type { CreateApplicationDTO } from "./application.dto";

export class ApplicationService {
  constructor(
    private readonly repo: Pick<ApplicationRepository, "create" | "findAll"> =
      new ApplicationRepository(),
  ) {}

  async createApplication(input: CreateApplicationDTO) {
    return this.repo.create(input);
  }

  async listApplications() {
    return this.repo.findAll();
  }
}
