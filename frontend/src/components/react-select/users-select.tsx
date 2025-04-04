import { useCallback } from 'react';
import { AxiosError } from 'axios';
import { components, GroupBase, OptionProps } from 'react-select';
import { AsyncPaginate, LoadOptions } from 'react-select-async-paginate';
import { toast } from 'sonner';
import { User } from '@/_types/user';
import { mainInstance } from '@/instances/main-instance';
import { formatName } from '@/lib/format-name';

type UserOptionData = {
  value: string;
  label: string;
  email: string;
};

const UserOption = (props: OptionProps<UserOptionData, false>) => (
  <components.Option {...props}>
    <div className="flex flex-col">
      <h6>{props.data.label}</h6>
      <small className="text-muted-foreground">{props.data.email}</small>
    </div>
  </components.Option>
);

const UsersSelect = ({ ...props }) => {
  const loadOptions: LoadOptions<
    UserOptionData,
    GroupBase<UserOptionData>,
    { page: number }
  > = useCallback(
    async (searchQuery, _loadedOptions, additional = { page: 1 }) => {
      const page = additional.page || 1;

      try {
        const response = await mainInstance.get(
          `/api/select/users?page=${page}&search=${searchQuery}&sort=first_name&limit=20`,
        );

        const options = response.data.records.map((user: User) => ({
          value: user.id,
          label: formatName(user, 'semifull'),
          email: user.email,
        }));

        return {
          options,
          hasMore: response.data.info.pages > page,
          additional: {
            page: page + 1,
          },
        };
      } catch (error: unknown) {
        if (error instanceof AxiosError) {
          toast.error(
            error.response?.data?.message ||
              error.message ||
              'An error occurred',
          );
        } else {
          toast.error('An unknown error occurred');
        }

        return {
          options: [],
          hasMore: false,
        };
      }
    },
    [],
  );

  const shouldLoadMore = (
    scrollHeight: number,
    clientHeight: number,
    scrollTop: number,
  ) => {
    return scrollHeight - (scrollTop + clientHeight) < clientHeight * 5;
  };

  return (
    <AsyncPaginate
      className="react-select-container"
      classNamePrefix="react-select"
      loadOptions={loadOptions}
      debounceTimeout={200}
      additional={{
        page: 1,
      }}
      components={{ Option: UserOption }}
      shouldLoadMore={shouldLoadMore} // Use custom loading trigger
      {...props}
    />
  );
};

export default UsersSelect;
