import { ReactNode, useEffect, useState } from "react";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

interface RHFWrapperProps {
    // onSubmit: (data: any) => void;
    dbData?: any;
    formFields?: any;
    children: ReactNode;
}

const RHFWrapper: React.FC<RHFWrapperProps> = ({
    // onSubmit,
    // formClass,
    dbData,
    formFields,
    children,
}) => {
    const [resetDone, setResetDone] = useState(false);

    // react-hook-form
    let defaultValues: { [key: string]: any } = {};
    let yupShape: { [key: string]: any } = {};
    formFields?.map((field: FormFields) => {
        // if (field.form && field.form.display) {
        yupShape[field.name as string] = field.yupSchema;
        defaultValues[field.name as string] = field.defaultValue;
        // defaultValues[field.name as string] = dbData
        //     ? dbData[field.name as string]
        //     : field.defaultValue;
        // }
    });

    const schema = yup.object().shape(yupShape).required();

    // console.log("dbData", dbData);
    // console.log("defaultValues", defaultValues);

    const methods = useForm({
        mode: "all",
        defaultValues: defaultValues,
        resolver: yupResolver(schema),
    });

    const {
        handleSubmit,
        setValue,
        watch,
        reset,
        register,
        control,
        getValues,
    } = methods;
    // const {
    //   fields: optionFields,
    //   append: optionAppend,
    //   remove: optionRemove,
    // } = useFieldArray({
    //   control,
    //   name: `options`,
    // });
    // console.log("optionFields", optionFields, optionAppend);
    // useEffect(() => {
    //   if (!!dbData) {
    //     console.log("dbData", dbData);
    //     Object.keys(dbData).forEach((key) => {
    //       if (!!dbData[key]) {
    //         setValue(key, dbData[key]);
    //       }
    //     });
    //   }
    // }, [dbData]);

    useEffect(() => {
        // Reset the form with the latestUser's values when it is loaded

        if (dbData && !resetDone) {
            let tmpDefaultValues: { [key: string]: any } = {};
            formFields?.map((field: FormFields) => {
                tmpDefaultValues[field.name as string] =
                    dbData && dbData[field.name as string]
                        ? dbData[field.name as string]
                        : field.defaultValue;
            });

            reset(tmpDefaultValues);
            setResetDone(true);
        }
    }, [dbData]);

    useEffect(() => {
        // Reset the form with the latestUser's values when it is loaded

        if (dbData) {
            setResetDone(false);
        }
    }, [dbData]);

    // console.log("dbData", dbData);
    // console.log("resetDone", resetDone);
    return (
        <FormProvider {...methods}>
            {/* <form className={formClass} onSubmit={handleSubmit(onSubmit)}> */}
            {children}
            {/* </form> */}
        </FormProvider>
    );
};

export default RHFWrapper;
