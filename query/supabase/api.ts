import supabase from "@/lib/supabase";
import dayjs from "dayjs";

export async function getData({
  ref,
  joinRef,
  orderField,
  isAscending,
}: {
  ref: string;
  joinRef?: string | undefined;
  orderField?: string | undefined;
  isAscending?: boolean | undefined;
}): Promise<unknown[]> {
  const { data, error } = await supabase
    .from(ref)
    .select("*")
    .order(orderField ? orderField : "created_at", {
      ascending: isAscending ? isAscending : false,
    });
  let finalData = data;

  if (error) {
    throw new Error(error.message);
  }

  if (joinRef) {
    const { data: joinData, error: joinError } = await supabase
      .from(ref)
      .select(`*, ${joinRef} (*)`)
      .order(orderField ? orderField : "created_at", {
        ascending: isAscending ? isAscending : false,
      });
    finalData = joinData;

    if (joinError) {
      throw new Error(joinError.message);
    }
  }

  return finalData as unknown[];
}

export async function getCountDataByFilter(
  ref: string,
  filter: SupabaseRangeFilter
): Promise<unknown> {
  const { count, error } = await supabase
    .from(ref)
    .select("*", { count: "exact", head: true })
    .filter(filter.filterField, filter.operator, filter.value)
    .order("created_at", { ascending: false });
  if (error) {
    throw new Error(error.message);
  }
  return count;
}

export async function getCountDataByRangeFilters(
  ref: string,
  filters: SupabaseRangeFilter[]
): Promise<unknown> {
  const query = supabase.from(ref).select("count");

  query.gte(filters[0].filterField, filters[0].value);
  query.lte(filters[1].filterField, filters[1].value);

  const { data, error } = await query;
  // console.log('data', data)
  if (error) {
    throw new Error(error.message);
  }
  return data[0].count;
}

export async function getDataById(
  id: string,
  ref: string,
  orderField?: string | undefined,
  isAscending?: boolean | undefined
): Promise<unknown> {
  if (id) {
    const { data, error } = await supabase
      .from(ref)
      .select("*")
      .filter("id", "eq", id)
      .order(orderField ? orderField : "created_at", {
        ascending: isAscending ? isAscending : false,
      });
    if (error) {
      throw new Error(error.message);
    }
    return data;
  }
}

export async function getDataByUid(
  uid: string,
  ref: string
): Promise<unknown[]> {
  const { data, error } = await supabase
    .from(ref)
    .select("*")
    .filter("uid", "eq", uid);
  if (error) {
    throw new Error(error.message);
  }
  return data;
}

export async function getDataByFilter(
  ref: string,
  filter: SupabaseRangeFilter,
  orderField?: string | undefined,
  isAscending?: boolean | undefined
): Promise<unknown[]> {
  const { data, error } = await supabase
    .from(ref)
    .select("*")
    .filter(filter.filterField, filter.operator, filter.value)
    .order(orderField ? orderField : "created_at", {
      ascending: isAscending ? isAscending : false,
    });
  if (error) {
    throw new Error(error.message);
  }
  return data;
}

export async function getDataByFilters(
  ref: string,
  filters: SupabaseFilter[],
  orderField?: string | undefined,
  isAscending?: boolean | undefined
): Promise<unknown[]> {
  let query = supabase
    .from(ref)
    .select("*")
    .order(orderField ? orderField : "created_at", {
      ascending: isAscending ? isAscending : false,
    });

  // filters.forEach((filter, index) => {
  //   if (index === 0) {
  //     query = query.filter(filter.filterField, filter.operator, filter.value)
  //   } else {
  //     const condition: 'and' | 'or' = filter.condition ? 'and' : 'or'
  //     query = (query as any)[condition](filter.filterField, filter.operator, filter.value)
  //   }
  // })
  for (const filter of filters) {
    query = query.filter(filter.filterField, filter.operator, filter.value);
  }
  const { data, error } = await query;

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getDataByRangeFilters(
  ref: string,
  filters: SupabaseRangeFilter[],
  orderField: string | undefined,
  isAscending: boolean | undefined
): Promise<unknown[]> {
  let query = supabase
    .from(ref)
    .select("*")
    .order(orderField ? orderField : "created_at", {
      ascending: isAscending ? isAscending : false,
    });

  query.gte(filters[0].filterField, filters[0].value);
  query.lte(filters[1].filterField, filters[1].value);
  if (filters[2] && filters[2].operator) {
    query = query.filter(
      filters[2].filterField,
      filters[2].operator,
      filters[2].value
    );
  }
  // console.log('----query: ', query)
  const { data, error } = await query;

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getDataByRangeFiltersJoinTable(
  ref: string,
  filters: SupabaseRangeFilter[],
  orderField: string | undefined,
  isAscending: boolean | undefined
): Promise<unknown[]> {
  const query = supabase
    .from(ref)
    .select("*, products!inner(*), orders!inner(*)")
    .order(orderField ? orderField : "created_at", {
      ascending: isAscending ? isAscending : false,
    });
  // query.innerJoin('products', 'product_id', 'id')

  query.gte(filters[0].filterField, filters[0].value);
  query.lte(filters[1].filterField, filters[1].value);
  // query.groupBy('product_id')

  // query.groupBy('id')
  // console.log('-----', query)

  const { data, error } = await query;

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getDataByFilterJoinTable(
  ref: string,
  joinRef: string,
  filter: SupabaseRangeFilter,
  orderField?: string | undefined,
  isAscending?: boolean | undefined
): Promise<unknown[]> {
  const { data, error } = await supabase
    .from(ref)
    .select(`*, ${joinRef} (*)`)
    .filter(filter.filterField, filter.operator, filter.value)
    .order(orderField ? orderField : "created_at", {
      ascending: isAscending ? isAscending : false,
    });
  if (error) {
    throw new Error(error.message);
  }
  return data;
}

export async function getDataByConditionFilters(
  ref: string,
  joinRef: string,
  filters: SupabaseRangeFilter[],
  filterType?: string
): Promise<unknown[]> {
  let query = supabase
    .from(ref)
    .select(`*, ${joinRef}!left(*)`)
    // .or(
    //   'user_id.eq.b76ab506-5161-48c3-a6e4-b622bc21b4ee, user_id.eq.ef65298f-0b8f-4e10-a9ed-484e7634bc16'
    // )
    .order("created_at", { ascending: false });

  if (filterType === "or") {
    const userFilters = filters.map(
      (filter) => `${filter.filterField}.${filter.operator}.${filter.value}`
    );
    if (userFilters.length > 0) {
      query = query.or(userFilters.join(", "));
    }
  } else {
    for (let i = 0; i < filters.length; i++) {
      const filter = filters[i];
      if (filter.operator) {
        query = query.or(
          `${filters[i].filterField}.${filters[i].operator}.${filters[i].value}`
        );
      }
    }
  }

  // console.log('query', query)
  // console.log('filters```', filterType)

  const { data, error } = await query;

  if (error) {
    throw new Error(error.message);
  }
  if (filters.length != 0) {
    return data;
  } else {
    return [];
  }
}

export async function getDataByFiltersLeftJoinTable(
  ref: string,
  joinRef: string,
  filters: SupabaseFilter[],
  orderField: string | undefined,
  isAscending: boolean | undefined
): Promise<unknown[]> {
  let query = supabase
    .from(ref)
    .select(`*, ${joinRef}!left(*)`)
    .order(orderField ? orderField : "created_at", {
      ascending: isAscending ? isAscending : false,
    });

  for (const filter of filters) {
    query = query.filter(filter.filterField, filter.operator, filter.value);
  }

  const { data, error } = await query;

  if (error) {
    throw new Error(error.message);
  }
  return data;
}

export async function getDataByFiltersJoinTables({
  ref,
  joinRef1,
  joinRef2,
  joinRef3, // Add another joinRef for the third table
  joinRef4,
  filters,
  orderField,
  isAscending,
}: {
  ref: string;
  joinRef1?: string | undefined;
  joinRef2?: string | undefined;
  joinRef3?: string | undefined; // Add type for the third table
  joinRef4?: string | undefined;
  filters?: SupabaseFilter[];
  orderField?: string | undefined;
  isAscending?: boolean | undefined;
}): Promise<unknown[]> {
  let query = supabase
    .from(ref)
    .select(
      joinRef1 && joinRef2 && joinRef3 && joinRef4
        ? `
          *,
          ${joinRef1} (
            *,
            ${joinRef3} (
              *
            )
          ),
          ${joinRef2} (
            *
          ),
          ${joinRef4} (
            *
          )
          `
        : joinRef1 && joinRef2 && joinRef3
        ? `
          *,
          ${joinRef1} (
            *,
            ${joinRef3} (
              *
            )
          ),
          ${joinRef2} (
            *
          )
          `
        : joinRef1 && joinRef2
        ? `
          *,
          ${joinRef1} (
            *,
            ${joinRef2} (
              *
            )
          )
          `
        : joinRef1
        ? `
          *,
          ${joinRef1} (
            *
          )
          `
        : "*"
    )
    .order(orderField ? orderField : "created_at", {
      ascending: isAscending ? isAscending : false,
    });
  if (filters) {
    for (const filter of filters) {
      if (filter.operator == "gte") {
        query.gte(filter.filterField, filter.value);
      }
      if (filter.operator == "lte") {
        query.lte(filter.filterField, filter.value);
      }
      if (filter.operator == "eq") {
        query = query.filter(filter.filterField, filter.operator, filter.value);
      }
    }
  }
  const { data, error } = await query;

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getDataByOrFiltersJoinTables({
  ref,
  joinRef1,
  joinRef2,
  joinRef3, // Add another joinRef for the third table
  joinRef4,
  filters,
  orderField,
  isAscending,
}: {
  ref: string;
  joinRef1?: string | undefined;
  joinRef2?: string | undefined;
  joinRef3?: string | undefined; // Add type for the third table
  joinRef4?: string | undefined;
  filters?: SupabaseFilter[];
  orderField?: string | undefined;
  isAscending?: boolean | undefined;
}): Promise<unknown[]> {
  let query = supabase
    .from(ref)
    .select(
      joinRef1 && joinRef2 && joinRef3 && joinRef4
        ? `
          *,
          ${joinRef1} (
            *,
            ${joinRef3} (
              *
            )
          ),
          ${joinRef2} (
            *
          ),
          ${joinRef4} (
            *
          )
          `
        : joinRef1 && joinRef2 && joinRef3
        ? `
          *,
          ${joinRef1} (
            *,
            ${joinRef3} (
              *
            )
          ),
          ${joinRef2} (
            *
          )
          `
        : joinRef1 && joinRef2
        ? `
          *,
          ${joinRef1} (
            *,
            ${joinRef2} (
              *
            )
          )
          `
        : joinRef1
        ? `*, ${joinRef1} (*)`
        : "*"
    )
    .order(orderField ? orderField : "created_at", {
      ascending: isAscending ? isAscending : false,
    });
  if (filters && filters.length > 0) {
    query = query.or(
      filters
        .map(
          (filter) => `${filter.filterField}.${filter.operator}.${filter.value}`
        )
        .join(",")
    );
  }
  // console.log("query", query);
  const { data, error } = await query;

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

// export async function getMerchantShopDataByFiltersJoinTables({
//   ref,
//   joinRef1,
//   joinRef2,
//   joinRef3, // Add another joinRef for the third table
//   joinRef4,
//   filters,
//   orderField,
//   isAscending,
// }: {
//   ref: string;
//   joinRef1: string | undefined;
//   joinRef2: string | undefined;
//   joinRef3: string | undefined; // Add type for the third table
//   joinRef4: string | undefined;
//   filters: SupabaseFilter[];
//   orderField?: string | undefined;
//   isAscending?: boolean | undefined;
// }): Promise<unknown[]> {
//   let query = supabase
//     .from(ref)
//     .select(
//       `
//           *,
//           ${joinRef1} (
//             *,
//             ${joinRef3} (
//               *
//             )
//           ),
//           ${joinRef2} (
//             *,
//             ${joinRef4} (
//               *
//             )
//           ),
//           `
//     )
//     .order(orderField ? orderField : "created_at", {
//       ascending: isAscending ? isAscending : false,
//     });
//   if (filters) {
//     for (const filter of filters) {
//       if (filter.operator == "gte") {
//         query.gte(filter.filterField, filter.value);
//       }
//       if (filter.operator == "lte") {
//         query.lte(filter.filterField, filter.value);
//       }
//       if (filter.operator == "eq") {
//         query = query.filter(filter.filterField, filter.operator, filter.value);
//       }
//     }
//   }
//   const { data, error } = await query;

//   if (error) {
//     throw new Error(error.message);
//   }

//   return data;
// }

// async getDataByFilterJoinTables(
//   ref: string,
//   joinRefs: JoinRef[],
//   filter: SupabaseRangeFilter
// ): Promise<unknown[]> {
//   let selectString = '*'

//   joinRefs.forEach((joinRef, index) => {
//     if (index === 0) {
//       selectString += `, ${joinRef.tableName}!inner(*)`
//     } else {
//       const previousJoinRef = joinRefs[index - 1]
//       selectString += `, ${previousJoinRef.tableName}.${joinRef.tableName}(${joinRef.foreignKey})!inner(*)`
//     }
//   })

//   const { data, error } = await supabase
//     .from(ref)
//     .select(selectString)
//     .filter(filter.filterField, filter.operator, filter.value)
//     .order('created_at', { ascending: false })

//   if (error) {
//     throw new Error(error.message)
//   }
//   return data
// },
//Cost Difference old
// async getTotalCostDifference(ref: string): Promise<number> {
//   const today = new Date()
//   const tomorrow = new Date()
//   const yesterday = new Date(today)
//   tomorrow.setDate(tomorrow.getDate() + 1)
//   yesterday.setDate(yesterday.getDate() - 1)
//   console.log('yesterday:', yesterday.toISOString().slice(0, 10))

//   const { data: todayData, error: todayError } = await supabase
//     .from('orders')
//     .select('total_amount')
//     .gte('created_at', dayjs().format('YYYY-MM-DD'))
//     .lte('created_at', dayjs().add(1, 'day').format('YYYY-MM-DD'))

//   if (todayError) {
//     throw new Error(todayError.message)
//   }

//   const { data: yesterdayData, error: yesterdayError } = await supabase
//     .from('orders')
//     .select('total_amount')
//     .gte('created_at', dayjs().subtract(1, 'day').format('YYYY-MM-DD'))
//     .lte('created_at', dayjs().format('YYYY-MM-DD'))
//   if (yesterdayError) {
//     throw new Error(yesterdayError.message)
//   }

//   const todayTotalCost = todayData.reduce(
//     (acc: number, order: any) => acc + order.total_amount,
//     0
//   )
//   const yesterdayTotalCost = yesterdayData.reduce(
//     (acc: number, order: any) => acc + order.total_amount,
//     0
//   )
//   // console.log('yesterday: ', yesterdayData)
//   // console.log('today: ', todayTotalCost)

//   const percentageChange =
//     (todayTotalCost - (yesterdayTotalCost - todayTotalCost)) /
//     (yesterdayTotalCost - todayTotalCost)
//   return percentageChange
// },

// total amount difference

export async function getTotalAmountDifference(
  ref: string,
  startDate: Date,
  endDate: Date,
  filter: SupabaseRangeFilter
): Promise<any> {
  // const yesterday = new Date(startDate)
  const periodLength =
    (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24);
  const previousStartDate = new Date(endDate);
  const previousEndDate = new Date(startDate);
  console.log("filter?.value", filter);

  // yesterday.setDate(yesterday.getDate() - 1)
  previousStartDate.setDate(previousStartDate.getDate() - periodLength * 2);
  previousEndDate.setDate(previousEndDate.getDate() - 1);

  const { data: currentData, error: currentError } = await supabase
    .from("orders")
    .select("*")
    .gte("created_at", dayjs(startDate).format("YYYY-MM-DD"))
    .lte("created_at", dayjs(endDate).add(1, "day").format("YYYY-MM-DD"))
    .filter(
      filter.filterField ? filter.filterField : "user_id",
      filter.value ? filter.operator : "like",
      filter.value ? filter.value : "%"
    );

  if (currentError) {
    throw new Error(currentError.message);
  }

  const { data: previousData, error: previousError } = await supabase
    .from("orders")
    .select("*")
    .gte("created_at", dayjs(previousStartDate).format("YYYY-MM-DD"))
    .lte(
      "created_at",
      dayjs(previousEndDate).add(1, "day").format("YYYY-MM-DD")
    )
    .filter(
      filter.filterField ? filter.filterField : "user_id",
      filter.value ? filter.operator : "like",
      filter.value ? filter.value : "%"
    );

  console.log("currentData", currentData);
  console.log("previousData", previousData);

  if (previousError) {
    throw new Error(previousError.message);
  }

  const currentTotalAmount = currentData.reduce(
    (acc: number, order: any) => acc + order.total_amount,
    0
  );

  const previousTotalAmount = previousData.reduce(
    (acc: number, order: any) => acc + order.total_amount,
    0
  );
  console.log("currentTotalAmount", currentTotalAmount);
  console.log("previousTotalAmount", previousTotalAmount);

  const percentageChange =
    (currentTotalAmount - previousTotalAmount) / previousTotalAmount;
  console.log("percentageChange", percentageChange);

  const data = {
    currentTotalAmount: currentTotalAmount,
    previousTotalAmount: previousTotalAmount,
    percentageChange: percentageChange,
  };

  return data;
}

export async function getUsers(page: number, size: number): Promise<User[]> {
  const startIndex = (page - 1) * size;
  const endIndex = startIndex + size - 1;

  const { data: users, error } = await supabase
    .from("users")
    .select("*")
    .range(startIndex, endIndex);

  if (error) {
    console.error(error);
    throw new Error("Failed to retrieve users");
  }

  return users.map((user) => ({
    uid: user.id,
    ...(user as User),
    created_at: new Date(user.created_at),
    updated_at: new Date(user.updated_at),
  }));
}

export async function addData(data: any) {
  const { ref, ...rest } = data;

  const tmpData = {
    ...rest,
    created_at: new Date(),
    updated_at: new Date(),
  };
  // console.log('tmpData', tmpData)

  const { data: dbData, error } = await supabase
    .from(ref)
    .insert(tmpData)
    .select();
  if (error) {
    throw new Error(error.message);
  }
  console.log("dbData", dbData);
  return dbData;
}

export async function addBulkData(data: any) {
  const { ref, bulkData, ...rest } = data;

  const tmpData = bulkData.map((d: any) => {
    return {
      ...d,
      created_at: new Date(),
      updated_at: new Date(),
    };
  });
  console.log("tmpData", tmpData);

  const { data: dbData, error } = await supabase
    .from(ref)
    .insert(tmpData)
    .select();
  if (error) {
    throw new Error(error.message);
  }
  // console.log('dbData', dbData)
  return dbData;
}

export async function updateData(data: any) {
  const { ref, id, created_at, updated_at, ...rest } = data;
  const tmpData = {
    ...rest,
    updated_at: new Date(),
  };
  const { data: dbData, error } = await supabase
    .from(ref)
    .update(tmpData)
    .match({ id });
  if (error) {
    throw new Error(error.message);
  }
  return dbData;
}

export async function removeData(data: any) {
  const { id, ref } = data;
  const { error } = await supabase.from(ref).delete().eq("id", id);

  if (error) {
    throw new Error(error.message);
  }
}

// async addFile(data: any) {
//   const { ref: getRef, uid, uploadAdmission, ...rest } = data;
//   console.log("id ref", uid);
//   const mountainImagesRef = ref(storage, uid + "/" + uploadAdmission[0].name);
//   const uploadTask = uploadBytesResumable(mountainImagesRef, uploadAdmission);
//   uploadTask.on(
//     "state_changed",
//     (snapshot) => {},
//     (error) => {
//       alert(error);
//     },
//     () => {
//       getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
//         const tmpData = {
//           updated_at: serverTimestamp(),
//           downloadURL,
//         };

//         const docRef = await updateDoc(doc(db, getRef, uid), tmpData);
//         return docRef;
//       });
//     }
//   );
// },

// async removeFile(data: any) {
//   const { id, ref: getRef } = data;

//   const desertRef = ref(storage, id + "/");

//   listAll(desertRef)
//     .then((res) => {
//       res.prefixes.forEach((folderRef) => {
//         // All the prefixes under listRef.
//         // You may call listAll() recursively on them.
//       });
//       res.items.forEach(async (itemRef) => {
//         try {
//           await deleteObject(itemRef);
//         } catch (error) {}
//         // All the items under listRef.
//       });
//     })
//     .catch((error) => {
//       // Uh-oh, an error occurred!
//     });
// },
