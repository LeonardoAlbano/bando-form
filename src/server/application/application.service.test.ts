import { describe, it, expect, vi } from "vitest";
import { ApplicationService } from "./application.service";
import type { CreateApplicationDTO } from "./application.dto";
import type { Application } from "@prisma/client";
import type { ApplicationRepository } from "./application.repository";

describe("ApplicationService", () => {
  it("deve delegar createApplication para o repositório", async () => {
    const fakeInput: CreateApplicationDTO = {
      name: "Leo",
      whatsapp: "+55 47 99999-9999",
      mainChallenge: "Entender meu funil",
      reactionToBlock: "Paro de produzir",
      controlLevel: 3,
      finalFit: "YES",
      notJoinReason: null,
    };

    const createMock: ApplicationRepository["create"] = vi.fn(
      async (input): Promise<Application> => ({
        id: "1",
        createdAt: new Date(),
        updatedAt: new Date(),
        name: input.name,
        whatsapp: input.whatsapp,
        mainChallenge: input.mainChallenge,
        reactionToBlock: input.reactionToBlock,
        controlLevel: input.controlLevel,
        finalFit: input.finalFit,
        notJoinReason: input.notJoinReason ?? null,
      }),
    );

    const findAllMock: ApplicationRepository["findAll"] = vi.fn(
      async (): Promise<Application[]> => [],
    );

    const repoMock: Pick<ApplicationRepository, "create" | "findAll"> = {
      create: createMock,
      findAll: findAllMock,
    };

    const service = new ApplicationService(repoMock);

    const result = await service.createApplication(fakeInput);

    expect(createMock).toHaveBeenCalledWith(fakeInput);
    expect(result.id).toBe("1");
  });

  it("deve delegar listApplications para o repositório", async () => {
    const apps: Application[] = [
      {
        id: "1",
        createdAt: new Date(),
        updatedAt: new Date(),
        name: "Leo",
        whatsapp: "+55 47 99999-9999",
        mainChallenge: "Entender meu funil",
        reactionToBlock: "Paro de produzir",
        controlLevel: 3,
        finalFit: "YES",
        notJoinReason: null,
      },
    ];

    const createMock: ApplicationRepository["create"] = vi.fn(
      async (input): Promise<Application> => ({
        id: "2",
        createdAt: new Date(),
        updatedAt: new Date(),
        name: input.name,
        whatsapp: input.whatsapp,
        mainChallenge: input.mainChallenge,
        reactionToBlock: input.reactionToBlock,
        controlLevel: input.controlLevel,
        finalFit: input.finalFit,
        notJoinReason: input.notJoinReason ?? null,
      }),
    );

    const findAllMock: ApplicationRepository["findAll"] = vi.fn(
      async (): Promise<Application[]> => apps,
    );

    const repoMock: Pick<ApplicationRepository, "create" | "findAll"> = {
      create: createMock,
      findAll: findAllMock,
    };

    const service = new ApplicationService(repoMock);

    const result = await service.listApplications();

    expect(findAllMock).toHaveBeenCalledTimes(1);
    expect(result).toEqual(apps);
  });
});
