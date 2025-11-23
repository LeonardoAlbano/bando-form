import { ApplicationRepository } from "./application.repository";
import { CreateApplicationDTO } from "./application.dto";

export class ApplicationService {
  private readonly repo = new ApplicationRepository();

  async createApplication(input: CreateApplicationDTO) {
    return this.repo.create(input);
  }

  async listApplications() {
    return this.repo.findAll();
  }
}
