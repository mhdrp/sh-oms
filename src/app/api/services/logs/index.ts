import { adminHeadersList, BACKEND_URL } from "@/lib/config";
import { DataResponseFromBackend, QueryOptions } from "@/types/common";
import axios from "axios";
import qs from "qs";

const SUB_DOMAIN = "/api/wms-logs";

export const getLogs = async ({ options }: { options: QueryOptions }) => {
  try {
    const params: QueryOptions = {
      ...options,
    };

    const queryOptions = qs.stringify(params, {
      encodeValuesOnly: true,
      addQueryPrefix: true,
    });

    const ENDPOINT = `${BACKEND_URL}${SUB_DOMAIN}${queryOptions}`;

    const res: DataResponseFromBackend<any> = await axios.get(ENDPOINT, {
      headers: adminHeadersList,
    });

    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const updateLogs = async ({
  id,
  videoUrl,
}: {
  id: number;
  videoUrl: string;
}) => {
  try {
    const endpoint = `${SUB_DOMAIN}/${id}`;

    const res: DataResponseFromBackend = await axios.put(
      `${BACKEND_URL}${endpoint}`,
      {
        data: {
          videoUrl,
        },
      },
      {
        headers: adminHeadersList,
      }
    );

    return res;
  } catch (error) {
    console.log(error);
  }
};

export const postLogs = async ({ logs }: { logs: any }) => {
  try {
    const endpoint = `${SUB_DOMAIN}`;

    const res: DataResponseFromBackend<any> = await axios.post(
      `${BACKEND_URL}${endpoint}`,
      {
        data: {
          ...logs,
        },
      },
      {
        headers: adminHeadersList,
      }
    );
    console.log({ res2: res });
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const deleteLogs = async ({ id }: { id: number }) => {
  try {
    const endpoint = `${SUB_DOMAIN}/${id}`;

    const res: DataResponseFromBackend = await axios.delete(
      `${BACKEND_URL}${endpoint}`,
      {
        headers: adminHeadersList,
      }
    );

    return res;
  } catch (error) {
    console.log(error);
  }
};
